package com.seb_45_main_021.unkwon.image;


import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {

    void deleteByImageUrl(String imageUrl);

}
