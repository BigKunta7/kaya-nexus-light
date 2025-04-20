-- Migration SQL : Activation du RLS et policies de base pour chaque table métier

-- Table projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projets : lecture propre utilisateur" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Projets : modification propre utilisateur" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Projets : suppression propre utilisateur" ON projects FOR DELETE USING (auth.uid() = user_id);

-- Table contacts (CRM)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Contacts : lecture propre utilisateur" ON contacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Contacts : modification propre utilisateur" ON contacts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Contacts : suppression propre utilisateur" ON contacts FOR DELETE USING (auth.uid() = user_id);

-- Table transactions (Finance)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Transactions : lecture propre utilisateur" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Transactions : modification propre utilisateur" ON transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Transactions : suppression propre utilisateur" ON transactions FOR DELETE USING (auth.uid() = user_id);

-- Table analytics_events
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Analytics : lecture admin" ON analytics_events FOR SELECT USING (auth.role() = 'admin');
CREATE POLICY "Analytics : ajout utilisateur" ON analytics_events FOR INSERT USING (auth.uid() IS NOT NULL);

-- Table ai_prompts
ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "AI Prompts : lecture admin" ON ai_prompts FOR SELECT USING (auth.role() = 'admin');
CREATE POLICY "AI Prompts : ajout utilisateur" ON ai_prompts FOR INSERT USING (auth.uid() IS NOT NULL);
