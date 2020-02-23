package com.hqyj.ssm;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hqyj.ssm.bean.po.user.UserPO;
import com.hqyj.ssm.mapper.user.UserMapper;
import com.hqyj.ssm.util.enumm.ResultStatic;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class SsmApplicationTests {
    @Autowired
    SqlSessionFactory sqlSessionFactory;

    @Resource
    UserMapper userMapper;

    @Test
    public void testQuery() {
        for (int i=0;i<100;i++){
            UserPO userPO = new UserPO();
            userPO.setUsername("哈哈哈");
            userPO.setPassword("11111");
            userPO.setSex("男");
            userMapper.insert(userPO);
        }

//        userMapper.deleteById("123456");

//        EntityWrapper<UserPO> wrapper = new EntityWrapper<>();
//        wrapper.eq("sex","男");
//        wrapper.or();
//        wrapper.eq("id","1");
//        userMapper.selectList(wrapper);

//        userMapper.selectList(new Wrapper<UserPO>() {
//            @Override
//            public String getSqlSegment() {
//                return "WHERE sex = '男';";
//            }
//        });
    }

    @Test
    public void testEnum(){
        System.out.println(ResultStatic.SUCCESS);
        System.out.println(ResultStatic.SUCCESS.getType()+":"+ResultStatic.SUCCESS.getDesc());
    }

    @Test
    public void testSelect(){

        UserPO userPO = new UserPO();

        QueryWrapper<UserPO> wrapper = new QueryWrapper<>();
        wrapper.setEntity(userPO);

        userMapper.selectPage(new Page<>(1,10),wrapper);

    }
}
