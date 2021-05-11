package com.bbsoftware.SportClub.contract;

import com.bbsoftware.SportClub.announcement.*;
import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRepository;
import com.bbsoftware.SportClub.exceptions.AnnouncementNotFoundException;
import com.bbsoftware.SportClub.exceptions.AppUserNotFoundException;

import com.bbsoftware.SportClub.exceptions.ContractNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@AllArgsConstructor
public class ContractController {
    private final ContractRepository contractRepository;
    private final ContractModelAssembler assembler;
    private final AppUserRepository appUserRepository;

    @GetMapping("/contract/{id}")
    public EntityModel<Contract> one(@PathVariable Long id)
    {
        Contract contract=contractRepository.findById(id).orElseThrow(()->new ContractNotFoundException(id));
        return assembler.toModel(contract);
    }
    @PostMapping("/contract")
    ResponseEntity<EntityModel<Contract>> newContract(@RequestBody ContractRequest contractRequest) {

        Contract contract=new Contract();
        contract.setMoney(contractRequest.getMoney());
        contract.setStart_date(contractRequest.getStart_date());
        contract.setEnd_date(contractRequest.getEnd_date());
        AppUser appUser=appUserRepository.findById(contractRequest.getUser_id()).orElseThrow(()->new AppUserNotFoundException(contractRequest.getUser_id()));
        contract.setUser(appUser);
        contractRepository.save(contract);
        return ResponseEntity //
                .created(linkTo(methodOn(ContractController.class).one(contract.getId())).toUri()) //
                .body(assembler.toModel(contract));
    }
}
//ADZKS-122