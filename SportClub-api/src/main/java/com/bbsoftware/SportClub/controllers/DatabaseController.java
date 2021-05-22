package com.bbsoftware.SportClub.controllers;

import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class DatabaseController {

    @Autowired
    DataSource dataSource;

    @GetMapping("db/clear")
    public ResponseEntity<?> clearDB() throws SQLException {

        try (Connection connection = dataSource.getConnection();
                PreparedStatement setChecks = connection.prepareStatement("SET FOREIGN_KEY_CHECKS = ?");
                PreparedStatement getTables = connection.prepareStatement(
                        "SELECT table_name FROM information_schema.tables WHERE table_schema = SCHEMA()")) {
            try (ResultSet tablesRes = getTables.executeQuery()) {
                setChecks.setBoolean(1, false);
                setChecks.executeUpdate();
                while (tablesRes.next()) {
                    String table = tablesRes.getString(1);
                    try (PreparedStatement truncateTable = connection
                            .prepareStatement("TRUNCATE TABLE " + table + " RESTART IDENTITY")) {
                        truncateTable.executeUpdate();
                    }
                }
            } finally {
                setChecks.setBoolean(1, true);
                setChecks.executeUpdate();
            }

            return ResponseEntity.status(HttpStatus.OK).build();
        }
    }

    @GetMapping("db/seed")
    public ResponseEntity<?> seedDB() throws SQLException, IOException {
        URL url = getClass().getResource("/data.sql");
        String path = url.getPath();
        BufferedReader reader = new BufferedReader(new FileReader(path));
        StringBuilder stringBuilder = new StringBuilder();
        char[] buffer = new char[256];
        while (reader.read(buffer) != -1) {
            stringBuilder.append(new String(buffer));
            buffer = new char[256];
        }
        reader.close();

        String content = stringBuilder.toString();

        try (Connection connection = dataSource.getConnection();) {
            FileReader file = new FileReader(path);
            PreparedStatement seedQuery = connection.prepareStatement(content);
            seedQuery.executeUpdate();
            file.close();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("db/reset")
    public ResponseEntity<?> resetDB() throws SQLException, IOException {

        clearDB();
        seedDB();

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
