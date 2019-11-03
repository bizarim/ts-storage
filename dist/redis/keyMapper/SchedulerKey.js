"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SchedulerKey {
    /**
     * hash key 얻기
     * @param id provider id
     * @param coin 코인
     */
    getKey(coin) {
        return `${coin}_scheduler_block_list`;
    }
}
exports.SchedulerKey = SchedulerKey;
//# sourceMappingURL=SchedulerKey.js.map