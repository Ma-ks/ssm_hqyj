package com.hqyj.ssm.util.page;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PageDTO<T> {
    private Integer page;//第几页
    private Integer limit;//一页多少条
    private T condition;
    private Integer limitLeft;
    private Integer limitRight;

    public Integer getLimitLeft() {
        //${(pageNo-1)*pageSize},${pageSize};
        this.limitLeft = (page - 1) * limit;
        return limitLeft;
    }

    public Integer getLimitRight() {
        this.limitRight = limit;
        return limitRight;
    }
}
