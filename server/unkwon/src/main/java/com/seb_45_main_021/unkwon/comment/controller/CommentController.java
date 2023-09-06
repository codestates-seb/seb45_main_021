package com.seb_45_main_021.unkwon.comment.controller;


import com.seb_45_main_021.unkwon.comment.dto.CommentDto;
import com.seb_45_main_021.unkwon.comment.entity.Comment;
import com.seb_45_main_021.unkwon.comment.mapper.CommentMapper;
import com.seb_45_main_021.unkwon.comment.service.CommentService;
import com.seb_45_main_021.unkwon.dto.SingleResponseDto;
import com.seb_45_main_021.unkwon.utils.UriCreator;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;
    private final static String COMMENT_DEFAULT_URL = "/comments";

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    // 댓글 생성
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.PostDto commentPostDto) {

        Comment comment = mapper.commentPostDtoToComment(commentPostDto);

        Comment savedComment = commentService.createComment(comment);

        URI location = UriCreator.createUri(COMMENT_DEFAULT_URL, savedComment.getCommentId());

        return ResponseEntity.created(location).build();

    }

    // 댓글 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody CommentDto.PatchDto commentPatchDto) {

        commentPatchDto.setCommentId(commentId);

        Comment comment = mapper.commentPatchDtoToComment(commentPatchDto);

        Comment updateComment = commentService.updateComment(comment/*, accessToken*/);

        CommentDto.ResponseDto responseDto = mapper.commentToCommentResponseDto(updateComment);

        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }


    // 댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId/*,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken*/) {
        commentService.deleteComment(commentId/*, accessToken*/);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
