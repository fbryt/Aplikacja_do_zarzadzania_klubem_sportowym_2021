package com.bbsoftware.SportClub.event;


import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRepository;
import com.bbsoftware.SportClub.exceptions.BadDateFormatException;
import com.bbsoftware.SportClub.exceptions.EventNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import lombok.AllArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
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

    @GetMapping(value = "/event",produces = "application/json", params = {"start","end"})
    public List<Event> getEventsInRange(@RequestParam(value = "start", required = true) String start,
                                         @RequestParam(value = "end",required = true) String end) throws JsonProcessingException {


        start = start.substring(0,19).replace("T", " ");
        end = end.substring(0,19).replace("T", " ");
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat inputDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        try {
            startDate = inputDateFormat.parse(start);
        } catch (ParseException e) {
            throw new BadDateFormatException("bad start date: " + start);
        }

        try {
            endDate = inputDateFormat.parse(end);
        } catch (ParseException e) {
            throw new BadDateFormatException("bad end date: " + end);
        }

        LocalDateTime startDateTime = LocalDateTime.ofInstant(startDate.toInstant(),
                ZoneId.systemDefault());

        LocalDateTime endDateTime = LocalDateTime.ofInstant(endDate.toInstant(),
                ZoneId.systemDefault());
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id = ((AppUser) principal).getId();
        return eventRepository.findByAppUsersIdAndDateStartGreaterThanEqualAndDateEndLessThanEqual(id,startDate, endDate);
    }
    @GetMapping("/event")
    public List<Event> events() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id = ((AppUser) principal).getId();
        return eventRepository.findAllByAppUsersId(id);
    }

}
