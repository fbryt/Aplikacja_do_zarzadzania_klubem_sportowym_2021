package com.bbsoftware.SportClub.injury;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRepository;
import com.bbsoftware.SportClub.exceptions.AppUserNotFoundException;
import com.bbsoftware.SportClub.exceptions.InjuryNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@AllArgsConstructor
public class InjuryController {
    private final InjuryRepository injuryRepository;
    private final InjuryModelAssembler assembler;
    private final AppUserRepository appUserRepository;


    @GetMapping("/injuries")
    public CollectionModel<EntityModel<Injury>> all() {
        List<EntityModel<Injury>> injuries = injuryRepository.findAll().stream()
                .map(assembler::toModel).collect(Collectors.toList());

        return CollectionModel.of(injuries, linkTo(methodOn(InjuryController.class).all()).withSelfRel());
    }

    @GetMapping("/injuries/{id}")
    public EntityModel<Injury> one(@PathVariable Long id) {
        Injury injury = injuryRepository.findById(id)
                .orElseThrow(() -> new InjuryNotFoundException(id));
        return assembler.toModel(injury);
    }

    @PostMapping("/injuries")
    ResponseEntity<EntityModel<Injury>> newInjury(@RequestBody InjuryRequest injuryRequest) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof AppUser) {

            Long id = ((AppUser) principal).getId();
            Injury injury = new Injury();
            injury.setDescription(injuryRequest.getDescription());
            injury.setStart_date(injuryRequest.getStart_date());
            injury.setEnd_date(injuryRequest.getEnd_date());
            AppUser appUser = appUserRepository.findById(id).orElseThrow(() -> new AppUserNotFoundException(id));
            injury.setUser(appUser);

            injuryRepository.save(injury);


            return ResponseEntity //
                    .created(linkTo(methodOn(InjuryController.class).one(injury.getId())).toUri()) //
                    .body(assembler.toModel(injury));

        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

    }

    @DeleteMapping("/injuries/{id}/delete")
    public void delete(@PathVariable Long id) {
        Injury injury = injuryRepository.findById(id) //
                .orElseThrow(() -> new InjuryNotFoundException(id));

        injuryRepository.delete(injury);
    }

    @PatchMapping("/injuries/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<Object, Object> updates) {

        Injury injury = injuryRepository.findById(id) //
                .orElseThrow(() -> new InjuryNotFoundException(id));

        updates.forEach((k, v) -> {
            // use reflection to get field k on manager and set it to value v
            Field field = ReflectionUtils.findField(Injury.class, (String) k);
            field.setAccessible(true);
            ReflectionUtils.setField(field, injury, v);
        });

        Injury updatedInjury = injuryRepository.save(injury);
        return ResponseEntity //
                .created(linkTo(methodOn(InjuryController.class).one(updatedInjury.getId())).toUri()) //
                .body(assembler.toModel(updatedInjury));
    }
}
