export interface User {
  email: string,
  password: string
}

export interface Link {
  clicks: string,
  code: string,
  date: Date,
  from:string,
  owner: string,
  to: string,
  _id: string
}
