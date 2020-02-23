package com.hqyj.ssm.mapper.user;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.hqyj.ssm.util.page.PageDTO;
import com.hqyj.ssm.bean.po.user.UserPO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper<UserPO> {
    //显示所用用户
    List<UserPO> selAll(PageDTO<UserPO> userPOPageDTO);

    @Select({"select * from user where username = #{username}"})
    UserPO selByUsername(String username);


}
