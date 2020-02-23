package com.hqyj.ssm.util.page;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PageVO<T> {
    private Integer code;
    private String msg;
    private Long count;
    private List<T> data;

}
