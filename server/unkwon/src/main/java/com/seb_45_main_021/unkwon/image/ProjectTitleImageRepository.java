package com.seb_45_main_021.unkwon.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.Nullable;

import java.util.Optional;

public interface ProjectTitleImageRepository extends JpaRepository<ProjectTitleImage, Long> {
    void deleteByImageUrl(String imageUrl);

}
