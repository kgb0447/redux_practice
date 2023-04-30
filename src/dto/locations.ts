
export interface countryTypes {
    code: string,
    name: string,
    states: stateTypes[]
}
export interface stateTypes{
    code: string,
    name: string,
    cities?: citiesTypes[]
    
}
export interface citiesTypes{
    name: string,
    population: number
}