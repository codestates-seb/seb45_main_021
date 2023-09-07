package com.seb_45_main_021.unkwon.oauth.memberinfo;

import java.util.Map;

public abstract class OAuth2MemberInfo {
    protected Map<String, Object> attributes;

    public OAuth2MemberInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public abstract String getId();
    public abstract String getUsername();
    public abstract String getImageUrl();
    public abstract String getEmail();

}
