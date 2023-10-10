using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UserController : BaseApiController
{
    private readonly DataContext _context;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IHobbyRepository _hobbyRepository;
    private readonly ISkillRepository _skillRepository;

    public UserController(
        DataContext context, 
        IUserRepository userRepository, 
        IMapper mapper, 
        IHobbyRepository hobbyRepository,
        ISkillRepository skillRepository)
    {
        _context = context;
        _userRepository = userRepository;
        _mapper = mapper;
        _hobbyRepository = hobbyRepository;
        _skillRepository = skillRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
    {
        var techs = await _userRepository.GetAllUserAsync();

        var techToReturn = _mapper.Map<IEnumerable<UserDto>>(techs);

        return Ok(techToReturn);
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> AddUser([FromBody]SaveUserDto userDto)
    {
        
        var user = new AppUser
        {
            Username = userDto.Username,
            Email = userDto.Email,
            PhoneNumber = userDto.PhoneNumber,
            CreatedDate = userDto.CreatedDate
        };

        user.UserSkillsets = new List<UserSkillsets>();

        _context.AppUser.Add(user);
        if (await _userRepository.SaveAllAsync())
        {
            var listHobby = userDto.UserHobbies.ToList();
            foreach (var h in listHobby)
            {
                var hobby = new UserHobbies
                {
                    Hobby = h.Hobby,
                    UserId = user.Id
                };

                _hobbyRepository.Add(hobby);
                await _hobbyRepository.SaveAllAsync();
            }

            var listSkills = userDto.UserSkillsets.ToList();
            foreach (var h in listSkills)
            {
                var skills = new UserSkillsets
                {
                    SkillName = h.SkillName,
                    UserId = user.Id
                };

                _skillRepository.Add(skills);
                await _skillRepository.SaveAllAsync();
            }
        }else{
            return BadRequest("Something happen");
        }

        return _mapper.Map<UserDto>(user);

    }
    
    [HttpPut("edit-user")]
    public async Task<ActionResult<UserDto>> EditUser(int id, [FromBody]UpdateUserDto updateUser)
    {
        
        var user = await _userRepository.GetUserById(id);

        if(user != null)
        {
             _mapper.Map<UpdateUserDto,AppUser>(updateUser, user);
            _userRepository.Update(user);
            await _userRepository.SaveAllAsync();

            var hobbies = await _hobbyRepository.GetAllHobbyByUserId(user.Id);
            
            foreach(var i in hobbies)
            {
                _hobbyRepository.Delete(i);
                await _hobbyRepository.SaveAllAsync();
            }

            var listHobby = updateUser.UserHobbies.ToList();
            foreach (var h in listHobby)
            {
                var hobby = new UserHobbies
                {
                    Hobby = h.Hobby,
                    UserId = user.Id
                };

                _hobbyRepository.Add(hobby);
                await _hobbyRepository.SaveAllAsync();
            }

            var skills = await _skillRepository.GetAllSkillByUserId(user.Id);
            
            foreach(var i in skills)
            {
                _skillRepository.Delete(i);
                await _hobbyRepository.SaveAllAsync();
            }

            var listSkills = updateUser.UserSkillsets.ToList();
            foreach (var h in listSkills)
            {
                var skill = new UserSkillsets
                {
                    SkillName = h.SkillName,
                    UserId = user.Id
                };

                _skillRepository.Add(skill);
                await _skillRepository.SaveAllAsync();
            }
            
            return _mapper.Map<UserDto>(user);
        }

        return NotFound("No user found");
        
    }


    [HttpDelete("delete-user")]
    public async Task<ActionResult<AppUser>> DeleteUser(int id)
    {
        var user = await _userRepository.GetUserById(id);

        if(user != null)
        {
            _userRepository.Delete(user);
            await _userRepository.SaveAllAsync();

            return user;
        }

        return BadRequest("No user found!" );
    }


}
