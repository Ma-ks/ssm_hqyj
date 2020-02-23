package com.hqyj.ssm.bean.po.user;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
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
@TableName("user")
public class UserPO implements Serializable {
    @TableId(type = IdType.AUTO)
    private Integer id;//员工编号
    private String username;//姓名
    private String password;//密码
    private String sex;//性别
    @DateTimeFormat(pattern = "yyyy-MM-dd")//将字符串格式化成日期
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")//将data对象格式化
    private Date birthday;//出生日期
    private String phone;//电话
    private String mail;//邮箱地址
    private String education;//学历
    private String department;//部门
    private String position;//职位
    @DateTimeFormat(pattern = "yyyy-MM-dd")//将字符串格式化成日期
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")//将data对象格式化
    private Date entryTime;//入职时间
    private String personStatic;//人员状态
    private String note;//备注


}
