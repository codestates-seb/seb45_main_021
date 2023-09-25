package unkwon.projectcard.repository;

import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectCardRepository extends JpaRepository<ProjectCard, Long> {
}
