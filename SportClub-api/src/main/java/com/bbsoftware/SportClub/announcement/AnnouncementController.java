package com.bbsoftware.SportClub.announcement;

import com.bbsoftware.SportClub.appuser.AppUser;
import com.bbsoftware.SportClub.appuser.AppUserRepository;
import com.bbsoftware.SportClub.controllers.OrderController;
import com.bbsoftware.SportClub.email.EmailService;
import com.bbsoftware.SportClub.exceptions.AnnouncementNotFoundException;
import com.bbsoftware.SportClub.exceptions.AppUserNotFoundException;
import com.bbsoftware.SportClub.exceptions.OrderNotFoundException;
import com.bbsoftware.SportClub.models.Order;
import lombok.AllArgsConstructor;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.jsonwebtoken.io.IOException;

import java.io.File;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@AllArgsConstructor
public class AnnouncementController {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementModelAssembler assembler;
    private final AppUserRepository appUserRepository;
    private final EmailService emailService;

    @GetMapping("/announcements")
    public CollectionModel<EntityModel<Announcement>> all() {
        List<EntityModel<Announcement>> announcements = announcementRepository.findAll().stream()
                .map(assembler::toModel).collect(Collectors.toList());

        return CollectionModel.of(announcements, linkTo(methodOn(AnnouncementController.class).all()).withSelfRel());
    }

    @GetMapping("/announcements/{id}")
    public EntityModel<Announcement> one(@PathVariable Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new AnnouncementNotFoundException(id));
        return assembler.toModel(announcement);
    }

    @PostMapping("/announcements")
    ResponseEntity<EntityModel<Announcement>> newAnnouncement(@RequestBody AnnouncementRequest announcementRequest)
            throws java.io.IOException {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof AppUser) {

            Long id = ((AppUser) principal).getId();
            Announcement announcement = new Announcement();
            announcement.setText(announcementRequest.getText());
            announcement.setDate(announcementRequest.getDate());
            AppUser appUser = appUserRepository.findById(id).orElseThrow(() -> new AppUserNotFoundException(id));
            announcement.setUser(appUser);

            announcementRepository.save(announcement);

            if (announcementRequest.getSendEmail()) {
                File input = new File("src/main/resources/templates/alertMail.html");
                Document doc;
                try {
                    doc = Jsoup.parse(input, null);
                    String mail = doc.toString();
                    System.out.println("Sending emails...");
                    List<AppUser> appUsers = appUserRepository.findAll();
                    for (AppUser user : appUsers) {
                        emailService.send(user.getEmail(), mail, "[ADZKS] Important announcement!");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    return new ResponseEntity(HttpStatus.FORBIDDEN);
                }

            }

            return ResponseEntity //
                    .created(linkTo(methodOn(AnnouncementController.class).one(announcement.getId())).toUri()) //
                    .body(assembler.toModel(announcement));

        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

    }

    @DeleteMapping("/announcements/{id}/delete")
    public void delete(@PathVariable Long id) {
        Announcement announcement = announcementRepository.findById(id) //
                .orElseThrow(() -> new AnnouncementNotFoundException(id));

        announcementRepository.delete(announcement);
    }

    @PatchMapping("/announcements/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<Object, Object> updates) {

        Announcement announcement = announcementRepository.findById(id) //
                .orElseThrow(() -> new AnnouncementNotFoundException(id));

        updates.forEach((k, v) -> {
            // use reflection to get field k on manager and set it to value v
            Field field = ReflectionUtils.findField(Announcement.class, (String) k);
            field.setAccessible(true);
            ReflectionUtils.setField(field, announcement, v);
        });

        Announcement updatedAnnouncement = announcementRepository.save(announcement);
        return ResponseEntity //
                .created(linkTo(methodOn(AnnouncementController.class).one(updatedAnnouncement.getId())).toUri()) //
                .body(assembler.toModel(updatedAnnouncement));
    }

}
