package com.orion.dashboard;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {"http://localhost:5173"}) // Front-end em Vite
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    // Endpoint principal - retorna dados brutos do dashboard
    @GetMapping
    public ResponseEntity<DashboardDTO> getDashboard(@RequestParam Long userId) {
        DashboardDTO dto = service.getDashboardData(userId);
        return ResponseEntity.ok(dto);
    }
}
