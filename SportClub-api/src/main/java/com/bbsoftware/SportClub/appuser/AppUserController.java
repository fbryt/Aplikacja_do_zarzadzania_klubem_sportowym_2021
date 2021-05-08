package com.bbsoftware.SportClub.appuser;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.bbsoftware.SportClub.exceptions.AppUserNotFoundException;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class AppUserController {

    private final AppUserRepository appUserRepository;
    private final AppUserModelAssembler appUserModelAssembler;
    private final AppUserService appUserService;

    @GetMapping("/appUsers")
    public CollectionModel<EntityModel<AppUser>> all() {

        List<EntityModel<AppUser>> appUsers = appUserRepository.findAll().stream() //
                .map(appUserModelAssembler::toModel) //
                .collect(Collectors.toList());

        return CollectionModel.of(appUsers, //
                linkTo(methodOn(AppUserController.class).all()).withSelfRel());
    }

    @GetMapping("/appUsers/{id}")
    public EntityModel<AppUser> one(@PathVariable Long id) {

        AppUser appUser = appUserRepository.findById(id) //
                .orElseThrow(() -> new AppUserNotFoundException(id));

        return appUserModelAssembler.toModel(appUser);
    }

    @PatchMapping("/appUsers/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<Object, Object> updates) {

        AppUser appUser = appUserRepository.findById(id) //
                .orElseThrow(() -> new AppUserNotFoundException(id));

        updates.forEach((k, v) -> {
            // use reflection to get field k on manager and set it to value v
            if(k == "coach"){
                appUserService.setCoachId(Integer.parseInt((String)v), id);

                return;
            }
            Field field = ReflectionUtils.findField(AppUser.class, (String) k);
            field.setAccessible(true);
            if (field.getType().isEnum()) {
                ReflectionUtils.setField(field, appUser, Enum.valueOf((Class<Enum>) field.getType(), (String) v));
            } else {
                ReflectionUtils.setField(field, appUser, v);
            }
        });

        AppUser updatedAppUser = appUserRepository.save(appUser);
        return ResponseEntity //
                .created(linkTo(methodOn(AppUserController.class).one(updatedAppUser.getId())).toUri()) //
                .body(appUserModelAssembler.toModel(updatedAppUser));
    }




}
