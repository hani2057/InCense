package com.suyang.incense.common.auth;

import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.repository.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberDetailsService implements UserDetailsService {
    @Autowired
    private MemberRepository memberRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> member = memberRepository.findByEmail(username);
        MemberDetails memberDetails = null;
        if(member.isPresent()) {
            memberDetails = new MemberDetails(member.get());
        }
        return memberDetails;
    }
}
