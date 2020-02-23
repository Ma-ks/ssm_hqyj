package com.hqyj.ssm.bean.po.user;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@TableName(value = "user")
public class UserPO implements Serializable {
    @TableId(type = IdType.AUTO)//主键自增
    private Integer id;//员工编号

    @TableField(whereStrategy = FieldStrategy.NOT_EMPTY)
    private String username;//姓名

    @TableField(whereStrategy = FieldStrategy.NOT_EMPTY)
    private String password;//密码

    @TableField(whereStrategy = FieldStrategy.NOT_EMPTY)
    private String sex;//性别

    @TableField(whereStrategy = FieldStrategy.NOT_NULL)
    @DateTimeFormat(pattern = "yyyy-MM-dd")//将字符串格式化成日期
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")//将data对象格式化
    private Date birthday;//出生日期

    @TableField(whereStrategy = FieldStrategy.NOT_EMPTY)
    private String phone;//电话

    @TableField(whereStrategy = FieldStrategy.NOT_EMPTY)
    private String mail;//邮箱地址

    @TableField(whereStrategy = FieldStrategy.NOT_EMPTY)
    private String education;//学历

    @TableField(whereStrategy = FieldStrategy.NOT_EMPTY)
    private String department;//部门

    @TableField(whereStrategy = FieldStrategy.NOT_EMPTY)
    private String position;//职位

    @TableField(whereStrategy = FieldStrategy.NOT_NULL)
    @DateTimeFormat(pattern = "yyyy-MM-dd")//将字符串格式化成日期
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")//将data对象格式化
    private Date entryTime;//入职时间

    @TableField(whereStrategy = FieldStrategy.NOT_EMPTY)
    private String personStatic;//人员状态

    @TableField(insertStrategy = FieldStrategy.NOT_EMPTY, whereStrategy = FieldStrategy.NOT_EMPTY) //用于判断空字符串
    private String note;//备注

}
