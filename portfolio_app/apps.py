from django.apps import AppConfig


class PortfolioAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'portfolio_app'

    def ready(self):
        import portfolio_app.signals  # Import the signals module to ensure signals are registered
    # This ensures that the signal handlers are connected when the app is ready.
    # The import statement will execute the code in signals.py, registering the signal handlers.