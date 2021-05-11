package com.bbsoftware.SportClub.announcement;

import com.bbsoftware.SportClub.appuser.AppUserController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class AnnouncementModelAssembler implements RepresentationModelAssembler<Announcement, EntityModel<Announcement>> {

    @Override
    public EntityModel<Announcement> toModel(Announcement announcement)
    {
        EntityModel<Announcement> announcementModel = EntityModel.of(announcement,
                linkTo(methodOn(AppUserController.class).one(announcement.getId())).withSelfRel(),
                linkTo(methodOn(AppUserController.class).all()).withRel("appUsers"));

        return announcementModel;
    }
}
