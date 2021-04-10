package com.bbsoftware.SportClub.appuser;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
public class AppUserModelAssembler implements RepresentationModelAssembler<AppUser, EntityModel<AppUser>> {

    @Override
    public EntityModel<AppUser> toModel(AppUser appUser) {

        // Unconditional links to single-item resource and aggregate root

        EntityModel<AppUser> appUserModel = EntityModel.of(appUser,
                linkTo(methodOn(AppUserController.class).one(appUser.getId())).withSelfRel(),
                linkTo(methodOn(AppUserController.class).all()).withRel("appUsers"));

        return appUserModel;
    }
}
