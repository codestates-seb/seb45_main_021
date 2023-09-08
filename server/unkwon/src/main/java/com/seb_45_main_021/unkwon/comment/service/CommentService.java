package com.seb_45_main_021.unkwon.comment.service;


import com.seb_45_main_021.unkwon.auth.userdetails.MemberInfo;
import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.comment.repository.CommentRepository;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.member.entity.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
//    private final JwtTokenizer jwtTokenizer;

    public CommentService(CommentRepository commentRepository/*, JwtTokenizer jwtTokenizer*/) {
        this.commentRepository = commentRepository;
//        this.jwtTokenizer = jwtTokenizer;
    }

    public Comment findVerifiedComment(long commentId){

        Optional<Comment> optional = commentRepository.findById(commentId);

        Comment findComment = optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;

    }

    // 댓글 생성
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }


    // 댓글 수정
    public Comment updateComment(Comment comment, MemberInfo memberInfo) {

        Comment findComment = findVerifiedComment(comment.getCommentId());

        Member findMember = findComment.getMember();
        findMember.checkMemberId(memberInfo);

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));

        return commentRepository.save(findComment);

    }


    // 댓글 삭제
    public void deleteComment(long commentId,MemberInfo memberInfo) {
        Comment findComment = findVerifiedComment(commentId);

        Member findMember = findComment.getMember();

        findMember.checkMemberId(memberInfo);

        commentRepository.delete(findComment);
    }


}
