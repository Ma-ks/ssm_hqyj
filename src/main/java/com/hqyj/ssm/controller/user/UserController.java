package com.hqyj.ssm.controller.user;

import com.hqyj.ssm.util.enumm.ResultStatic;
import com.hqyj.ssm.util.page.PageDTO;
import com.hqyj.ssm.bean.po.user.UserPO;
import com.hqyj.ssm.util.page.PageVO;
import com.hqyj.ssm.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/userController")
public class UserController {
    @Autowired
    UserService userService;

    @ResponseBody
    @RequestMapping("/login")
    public String login(String username, String password) {
        String info = userService.checkUserLogin(username, password);
        return info;
    }
    //forward与redirect 从static目录下找
    //return "redirect:/html/login.html";

    @ResponseBody
    @RequestMapping("/show")
    public PageVO<UserPO> showAll(@RequestBody PageDTO<UserPO> pageDTO) {

        PageVO<UserPO> userPOPageVO = userService.selAllUser(pageDTO);

        return userPOPageVO;
    }

    @ResponseBody
    @RequestMapping("/addUser")
    public String addUser(UserPO userPO){
        ResultStatic resultStatic = userService.addUser(userPO);
        return resultStatic.toString();
    }



}
