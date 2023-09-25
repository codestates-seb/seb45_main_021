package unkwon.projectcard.controller;

import com.seb_45_main_021.unkwon.projectcard.dto.request.ProjectCardPatchDto;
import com.seb_45_main_021.unkwon.projectcard.dto.request.ProjectCardPostDto;
import com.seb_45_main_021.unkwon.projectcard.dto.response.ProjectCardApplyResponseDto;
import com.seb_45_main_021.unkwon.projectcard.dto.response.ProjectCardPostResponseDto;
import com.seb_45_main_021.unkwon.projectcard.entity.ProjectCard;
import com.seb_45_main_021.unkwon.projectcard.mapper.ProjectCardMapper;
import com.seb_45_main_021.unkwon.projectcard.service.ProjectCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/projectcards")
@RequiredArgsConstructor
@CrossOrigin
public class ProjectCardController {
    private final ProjectCardService projectCardService;
    private final ProjectCardMapper projectCardMapper;
    // 카드 생성
    @PostMapping("/{member-id}")
    public ResponseEntity postProjectCard(@PathVariable("member-id") @Positive Long memberId,
                                @Valid @RequestBody ProjectCardPostDto dto){
        dto.setMemberId(memberId);
        ProjectCard projectCard = projectCardService.postProjectCard(dto);
        ProjectCardPostResponseDto postResponseDto = ProjectCardPostResponseDto.builder()
                .projectCardId(projectCard.getProjectCardId()).build();

        return new ResponseEntity<>(postResponseDto, HttpStatus.CREATED);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getProjectCards(@PathVariable("member-id") @Positive Long memberId){
        List<ProjectCard> projectCardList = projectCardService.getProjectCards(memberId);
        List<ProjectCardApplyResponseDto> responseDtoList = projectCardMapper.projectCardListToProjectCardApplyResponseDto(projectCardList);

        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }

    // 카드 수정
    @PatchMapping("/{projectcard-id}")
    public ResponseEntity updateProjectCard(@PathVariable("projectcard-id") @Positive Long projectCardId,
                                  @Valid @RequestBody ProjectCardPatchDto dto){
        dto.setProjectCardId(projectCardId);
        projectCardService.updateProjectCard(dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 카드 삭제
    @DeleteMapping("/{projectcard-id}")
    public ResponseEntity deleteProjectCard(@PathVariable("projectcard-id") @Positive Long projectCardId){
        projectCardService.removeProjectCard(projectCardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
