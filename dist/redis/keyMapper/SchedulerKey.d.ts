import { IKeyMapper } from '../base/KeyMapper';
export declare class SchedulerKey implements IKeyMapper {
    /**
     * hash key 얻기
     * @param id provider id
     * @param coin 코인
     */
    getKey(coin: string): string;
}
