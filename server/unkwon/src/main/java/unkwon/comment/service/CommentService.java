package unkwon.comment.service;


import com.seb_45_main_021.unkwon.auth.userdetails.MemberInfo;
import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.comment.repository.CommentRepository;
import com.seb_45_main_021.unkwon.exception.BusinessLogicException;
import com.seb_45_main_021.unkwon.exception.ExceptionCode;
import com.seb_45_main_021.unkwon.member.entity.Member;
import org.springframework.security.access.AccessDeniedException;
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

        Optional.ofNullable(comment.getBody())
                .ifPresent(content -> findComment.setBody(content));

        return commentRepository.save(findComment);

    }


    // 댓글 삭제
    public void deleteComment(long commentId, MemberInfo memberInfo) {

        Comment findComment = findVerifiedComment(commentId);

        Member findCommentMember = findComment.getMember();
        Member findPortfolioMember = findComment.getPortFolio().getMember();

        if (findCommentMember.getMemberId() == memberInfo.getMemberId() || findPortfolioMember.getMemberId() == memberInfo.getMemberId()) {
            commentRepository.delete(findComment);
        } else {
            // 권한이 없는 경우 예외 처리 또는 오류 응답을 처리할 수 있습니다.
            throw new AccessDeniedException(ExceptionCode.DIFFERENT_MEMBER.getMessage());
        }
    }


}
