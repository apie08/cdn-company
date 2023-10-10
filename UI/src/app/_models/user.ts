export interface AppUser {
    id: number
    username: string
    email: string
    phoneNumber: string
    createdDate: string
    modifiedDate: string
    userHobbies: UserHobbies[]
    userSkillsets: UserSkillset[]
  }
  
  export interface UserHobbies {
    id: number
    hobby: string
  }
  
  export interface UserSkillset {
    id: number
    skillName: string
  }