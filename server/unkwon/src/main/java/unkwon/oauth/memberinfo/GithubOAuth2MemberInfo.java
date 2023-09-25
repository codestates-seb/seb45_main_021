package unkwon.oauth.memberinfo;

import java.util.Map;

public class GithubOAuth2MemberInfo extends OAuth2MemberInfo{
    public GithubOAuth2MemberInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getUsername() { return (String) attributes.get("login"); }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("avatar_url");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }
}
