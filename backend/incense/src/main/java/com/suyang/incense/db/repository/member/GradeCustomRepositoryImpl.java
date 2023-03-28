package com.suyang.incense.db.repository.member;

import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import static com.suyang.incense.db.entity.member.QMember.member;

@Repository
public class GradeCustomRepositoryImpl implements GradeCustomRepository{

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

//    select case
//    when member.score between 0 and 99 then "1"
//    when member.score between 100 and 299 then "2"
//    when member.score between 300 and 699 then "3"
//    when member.score between 700 and 1299 then "4"
//            else "5"
//    end as member_rank
//    from member;


    @Override
    public String checkMemberRank(Long memberId) {
        return jpaQueryFactory
                .select(new CaseBuilder()
                        .when(member.score.between(0, 99)).then("1")
                        .when(member.score.between(100, 299)).then("2")
                        .when(member.score.between(300, 699)).then("3")
                        .when(member.score.between(700, 1299)).then("4")
                        .otherwise("5"))
                        .where(member.id.eq(memberId))
                .from(member)
                .fetchOne();
    }
}
