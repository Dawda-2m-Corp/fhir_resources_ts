import { CarePlan } from '../../src/r4/carePlan';


test('CarePlan resource can be created', () => {
    const carePlan = new CarePlan({
        id: "example-careplan",
        status: "active",
        intent: "plan",
        category: [{
            coding: [{
                system: "http://terminology.hl7.org/CodeSystem/care-plan-category",
                code: "assess-plan"
            }]
        }],
        title: "Weight management plan",
        description: "A comprehensive plan to help patient achieve healthy weight",
        subject: {
            reference: "Patient/example"
        },
        period: {
            start: "2024-01-01",
            end: "2024-06-30"
        },
        created: "2024-01-01T10:00:00Z",
        custodian: {
            reference: "Practitioner/dr-smith"
        },
        careTeam: [{
            reference: "CareTeam/weight-management-team"
        }],
        addresses: [{
            reference: {
                reference: "Condition/obesity"
            },
            concept: {
                coding: [{
                    system: "http://snomed.info/sct",
                    code: "414916001",
                    display: "Obesity"
                }]
            }
        }],
        goal: [{
            reference: "Goal/weight-loss-goal"
        }],
        activity: [{
            progress: [{
                text: "Patient has started walking 30 minutes daily",
                time: "2024-01-15T14:30:00Z"
            }],
            plannedActivityReference: {
                reference: "ServiceRequest/nutrition-counseling"
            }
        }],
        note: [{
            text: "Patient is motivated and committed to lifestyle changes",
            time: "2024-01-01T10:00:00Z"
        }]
    });

    const json = carePlan.toJson();
    // console.log('CarePlan JSON:', JSON.stringify(json, null, 2));

    expect(carePlan.resourceType).toBe("CarePlan");
    expect(carePlan.id).toBe("example-careplan");
    expect(carePlan.status).toBe("active");
    expect(carePlan.intent).toBe("plan");
    expect(json.resourceType).toBe("CarePlan");
    expect(json.title).toBe("Weight management plan");
    expect(json.category).toHaveLength(1);
    expect(json.addresses).toHaveLength(1);
    expect(json.activity).toHaveLength(1);
    expect(json.goal).toHaveLength(1);
});

test('CarePlan with minimal required fields', () => {
    const carePlan = new CarePlan({
        status: "draft",
        intent: "proposal",
        subject: {
            reference: "Patient/minimal-example"
        }
    });

    const json = carePlan.toJson();

    expect(carePlan.resourceType).toBe("CarePlan");
    expect(carePlan.status).toBe("draft");
    expect(carePlan.intent).toBe("proposal");
    expect(json.subject.reference).toBe("Patient/minimal-example");
});