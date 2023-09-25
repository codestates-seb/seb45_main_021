package unkwon.commonCode;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommonCodeService {

    private final CommonCodeRepository commonCodeRepository;

    public CommonCodeService(CommonCodeRepository commonCodeRepository) {
        this.commonCodeRepository = commonCodeRepository;
    }

    public List<CommonCode> findCodesByCategory(String category) {
        return commonCodeRepository.findByCategory(category);
    }
}
