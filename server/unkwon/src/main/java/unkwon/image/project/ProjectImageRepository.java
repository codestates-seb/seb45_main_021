package unkwon.image.project;


import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {

    void deleteByImageUrl(String imageUrl);

}
