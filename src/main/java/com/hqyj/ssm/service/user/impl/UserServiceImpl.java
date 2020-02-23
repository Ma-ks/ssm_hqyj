package com.hqyj.ssm.service.user.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hqyj.ssm.util.enumm.ResultStatic;
import com.hqyj.ssm.util.page.PageDTO;
import com.hqyj.ssm.bean.po.user.UserPO;
import com.hqyj.ssm.util.page.PageVO;
import com.hqyj.ssm.mapper.user.UserMapper;
import com.hqyj.ssm.service.user.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserMapper userMapper;

    @Override
    public String checkUserLogin(String username, String password) {
        UserPO userPO = userMapper.selByUsername(username);
        if (userPO != null) {
            if (userPO.getPassword().equals(password)) {
                return "用户名和密码正确";
            }
            return "密码错误";
        }
        return "用户名不存在";
    }

    @Override
    public PageVO selAllUser(PageDTO<UserPO> pageDTO) {
//        List<UserPO> userPOS = userMapper.selAll(pageDTO);
        //lay table 传过来的参数
        Integer page = pageDTO.getPage();
        Integer limit = pageDTO.getLimit();

        //设置条件
        QueryWrapper<UserPO> wrapper = new QueryWrapper<>();
        wrapper.setEntity(pageDTO.getCondition());

        //进行分页查询
        Page<UserPO> userPOPage = userMapper.selectPage(new Page<>(page, limit), wrapper);
        List<UserPO> userPOS = userPOPage.getRecords();

        //该条件下有几天数据
        Long count = userPOPage.getTotal();

        //设置lay table 需要的参数
        PageVO<UserPO> userPOPageVO = new PageVO<>();
        userPOPageVO.setCount(count);
        userPOPageVO.setData(userPOS);
        userPOPageVO.setCode(0);

        return userPOPageVO;
    }

    @Override
    public ResultStatic addUser(UserPO userPO) {
        int status = 0;
        if (userPO != null) {
            status = userMapper.insert(userPO);
        }
        if (status > 0) {
            return ResultStatic.SUCCESS;
        } else {
            return ResultStatic.FAIL;
        }
    }


}
