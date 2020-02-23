package com.hqyj.ssm.util.enumm;

public enum  ResultStatic {
    FAIL("code", "0"),
    SUCCESS("code", "1");

    private String type;    //类型
    private String desc;    //描述

    private ResultStatic(String type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    @Override
    public String toString() {
        return "{\"" + type + "\":\"" + desc + "\"}";
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
