package unkwon.image.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioImageRepository extends JpaRepository<PortfolioImage, Long> {

    void deleteByImageUrl(String imageUrl);

}
