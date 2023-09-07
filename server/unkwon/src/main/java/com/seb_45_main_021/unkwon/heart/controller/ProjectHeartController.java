package com.seb_45_main_021.unkwon.heart.controller;

import com.seb_45_main_021.unkwon.dto.MultiResponseDto;
import com.seb_45_main_021.unkwon.heart.dto.ProjectHeartDto;
import com.seb_45_main_021.unkwon.heart.service.ProjectHeartService;
import com.seb_45_main_021.unkwon.member.entity.Member;
import com.seb_45_main_021.unkwon.member.service.MemberService;
import com.seb_45_main_021.unkwon.portfolio.entity.PortFolio;
import com.seb_45_main_021.unkwon.project.entity.Project;
import com.seb_45_main_021.unkwon.project.mapper.ProjectMapper;
import com.seb_45_main_021.unkwon.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/hearts")
public class ProjectHeartController {

    private final ProjectHeartService projectHeartService;
    private final ProjectService projectService;
    private final MemberService memberService;
    private final ProjectMapper mapper;

    @Autowired
    public ProjectHeartController(ProjectHeartService projectHeartService, ProjectService projectService, MemberService memberService, ProjectMapper mapper) {

        this.projectHeartService = projectHeartService;
        this.projectService = projectService;
        this.memberService = memberService;
        this.mapper = mapper;

    }

    @PostMapping("/{projectId}")
    @ResponseBody
    public ResponseEntity heartProject(@PathVariable Long projectId,
                                       @RequestBody ProjectHeartDto projectHeartDto) {
        Long memberId = Long.valueOf(projectHeartDto.getMemberId());
        Member member = memberService.findVerifiedMember(memberId);

        Project project = projectService.findVerifiedProject(projectId);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }

        if (!projectHeartService.isHeartPost(member, project)) {
            projectHeartService.heart(member, project);

            return ResponseEntity.ok("hearted");
        } else {
            projectHeartService.unheart(member, project);
            return ResponseEntity.ok("unhearted");
        }
    }

    // 특정 회원이 '좋아요'를 누른 프로젝트 목록을 페이징 처리하여 반환
    @GetMapping("/memberLikes/{memberId}")
    public ResponseEntity<Page<Project>> getHeartedProjectsByMemberId(@PathVariable Long memberId,
                                                                          @RequestParam(required = false, defaultValue = "1") int page,
                                                                          @RequestParam(required = false, defaultValue = "12") int size ) {
        Page<Project> heartedProjects = projectHeartService.getHeartedProjectsByMemberId(memberId, PageRequest.of(page - 1, size));
        List<Project> projects = heartedProjects.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.projectsToProjectResponseDtos(projects),heartedProjects), HttpStatus.OK);
    }

}
