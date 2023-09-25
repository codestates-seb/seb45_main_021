package unkwon.comment.repository;

import com.seb_45_main_021.unkwon.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
