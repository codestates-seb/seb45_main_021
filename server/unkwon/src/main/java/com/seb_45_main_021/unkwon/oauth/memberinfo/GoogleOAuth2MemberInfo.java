package com.seb_45_main_021.unkwon.oauth.memberinfo;

import com.seb_45_main_021.unkwon.member.entity.SocialType;
import lombok.Getter;

import java.util.Map;

public class GoogleOAuth2MemberInfo extends OAuth2MemberInfo{
    public GoogleOAuth2MemberInfo(Map<String, Object> attributes){
        super(attributes);
    }
    @Override
    public String getUsername() {return (String) attributes.get("name");}

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }
}
