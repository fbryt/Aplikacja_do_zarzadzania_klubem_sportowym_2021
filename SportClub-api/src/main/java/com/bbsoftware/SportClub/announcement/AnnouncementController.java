package com.bbsoftware.SportClub.announcement;


import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserController;
import com.bbsoftware.SportClub.appuser.AppUserModelAssembler;
import lombok.AllArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@AllArgsConstructor
public class AnnouncementController {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementModelAssembler assembler;

    @GetMapping("/announcements")
    public CollectionModel<EntityModel<Announcement>> all()
    {
        List<EntityModel<Announcement>> announcements=announcementRepository.findAll().stream().
                map(assembler::toModel).collect(Collectors.toList());

        return CollectionModel.of(announcements,linkTo(methodOn(AnnouncementController.class).all()).withSelfRel());
    }

}
