package com.bbsoftware.SportClub.event;


import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRepository;
import com.bbsoftware.SportClub.contract.*;
import com.bbsoftware.SportClub.exceptions.AppUserNotFoundException;
import com.bbsoftware.SportClub.exceptions.ContractNotFoundException;
import com.bbsoftware.SportClub.exceptions.EventNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.xml.transform.Source;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@AllArgsConstructor
public class EventController {

    private final EventRepository eventRepository;
    private final EventModelAssembler assembler;
    private final AppUserRepository appUserRepository;

    @GetMapping("/event/{id}")
    public EntityModel<Event> one(@PathVariable Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new EventNotFoundException(id));
        return assembler.toModel(event);
    }
    @PostMapping("/event")
    ResponseEntity<EntityModel<Event>> newEvent(@RequestBody EventRequest eventRequest) throws ParseException {
        Event event = new Event();
        event.setDateStart(eventRequest.getDateStart());
        event.setDateEnd(eventRequest.getDateEnd());
        event.setMessage(eventRequest.getMessage());
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof AppUser) {
            Long id = ((AppUser) principal).getId();
            Optional<AppUser> coach = appUserRepository.findById(id);
            System.out.println(coach.get());
            if(coach.isPresent()) {
                event.setAppUsers(coach.get().getPlayers());
                eventRepository.save(event);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Error");
        }
        return ResponseEntity //
                .created(linkTo(methodOn(EventController.class).one(event.getId())).toUri()) //
                .body(assembler.toModel(event));
    }
}
