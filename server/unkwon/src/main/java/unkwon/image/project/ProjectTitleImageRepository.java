package unkwon.image.project;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTitleImageRepository extends JpaRepository<ProjectTitleImage, Long> {
    void deleteByImageUrl(String imageUrl);

}
