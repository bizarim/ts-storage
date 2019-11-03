export interface IHashKeyMapper {
    /**
     * hashkey 얻기
     * @param args params
     */
    getKey(...args: string[]): string;
    /**
     * hashfield 얻기
     * @param field 필드값
     */
    getField(field: string): string;
}
export interface IKeyMapper {
    /**
     * key 얻기
     * @param args params
     */
    getKey(...args: string[]): string;
}
