package com.bbsoftware.SportClub.injury;


import com.bbsoftware.SportClub.appuser.AppUserController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class InjuryModelAssembler implements RepresentationModelAssembler<Injury, EntityModel<Injury>> {

    @Override
    public EntityModel<Injury> toModel(Injury injury)
    {
        EntityModel<Injury> injuryModel = EntityModel.of(injury,
                linkTo(methodOn(AppUserController.class).one(injury.getId())).withSelfRel(),
                linkTo(methodOn(AppUserController.class).all()).withRel("appUsers"));
        return injuryModel;
    }

}
