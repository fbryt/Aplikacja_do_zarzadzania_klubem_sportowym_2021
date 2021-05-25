package com.bbsoftware.SportClub.event;


import com.bbsoftware.SportClub.appuser.AppUserController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component

public class EventModelAssembler  implements RepresentationModelAssembler<Event, EntityModel<Event>> {

    @Override
    public EntityModel<Event> toModel(Event event)
    {
        EntityModel<Event> eventModel = EntityModel.of(event,
                linkTo(methodOn(AppUserController.class).one(event.getId())).withSelfRel(),
                linkTo(methodOn(AppUserController.class).all()).withRel("appUsers"));

        return eventModel;
    }
}
