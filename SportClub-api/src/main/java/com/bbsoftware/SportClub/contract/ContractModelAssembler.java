package com.bbsoftware.SportClub.contract;

import com.bbsoftware.SportClub.announcement.Announcement;
import com.bbsoftware.SportClub.contract.Contract;
import com.bbsoftware.SportClub.appuser.AppUserController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class ContractModelAssembler  implements RepresentationModelAssembler<Contract, EntityModel<Contract>> {
    @Override
    public EntityModel<Contract> toModel(Contract contract)
    {
        EntityModel<Contract> contractModel = EntityModel.of(contract,
                linkTo(methodOn(AppUserController.class).one(contract.getId())).withSelfRel(),
                linkTo(methodOn(AppUserController.class).all()).withRel("appUsers"));
        return contractModel;
    }
}
