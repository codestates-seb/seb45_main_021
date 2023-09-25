package com.seb_45_main_021.unkwon.image.project;

import com.seb_45_main_021.unkwon.image.project.ProjectTitleImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTitleImageRepository extends JpaRepository<ProjectTitleImage, Long> {
    void deleteByImageUrl(String imageUrl);

}
