package com.hqyj.ssm.service.user;

import com.hqyj.ssm.util.enumm.ResultStatic;
import com.hqyj.ssm.util.page.PageDTO;
import com.hqyj.ssm.bean.po.user.UserPO;
import com.hqyj.ssm.util.page.PageVO;

public interface UserService {
    /**
     * 登陆
     * @param username
     * @param password
     * @return
     */
    String checkUserLogin(String username,String password);

    /**
     * 分页查询
     * @param pageDTO
     * @return
     */
    PageVO<UserPO> selAllUser(PageDTO<UserPO> pageDTO);

    /**
     * 添加用户
     * @param userPO
     * @return
     */
    ResultStatic addUser(UserPO userPO);

}
