export interface FilterQuery {
    with?: string;
    select?: string;
    filter?: string;
    orderBy?: string;
    skip?: number;
    take?: number;
    cursor?: string;
    page?: number;
    size?: number;
}
export const DefaultParams =()=> {
    return {
      page: 1,
      take: 10
    }
  }
export const DefaultParamsUserRole = {
    page: 1,
    take: 10,
    with: "roleTranslations",
  };